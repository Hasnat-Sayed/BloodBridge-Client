import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { FaUserCheck, FaUserShield, FaUserTag } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import RoleMenu from '../../../components/dashboard/RoleMenu';

const ROLE_BADGE = {
  admin: 'badge-primary',
  volunteer: 'badge-secondary',
  donor: 'badge-accent',
};

const SkeletonRows = () => (
  Array.from({ length: 6 }).map((_, i) => (
    <tr key={i}>
      <td>
        <div className="flex items-center gap-3">
          <div className="skeleton h-12 w-12 rounded-full shrink-0"></div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-3 w-44"></div>
          </div>
        </div>
      </td>
      <td><div className="skeleton h-6 w-20 rounded-full"></div></td>
      <td><div className="skeleton h-6 w-28 rounded-full"></div></td>
      <td><div className="skeleton h-8 w-32"></div></td>
    </tr>
  ))
);

const confirm = (title, text, confirmText) =>
  Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: confirmText,
    confirmButtonColor: '#D62839',
    background: 'var(--color-base-100)',
    color: 'var(--color-base-content)',
  }).then(r => r.isConfirmed);

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: me } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState({}); 

  const fetchUsers = () => {
    setError(false);
    axiosSecure.get('/users')
      .then(res => setUsers(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosSecure]);

 
  const updateUser = async (email, changes, request, successMsg) => {
    const previous = users.find(u => u.email === email);
    setBusy(b => ({ ...b, [email]: true }));
    setUsers(list => list.map(u => (u.email === email ? { ...u, ...changes } : u)));
    try {
      await request();
      toast.success(successMsg);
    } catch {
      setUsers(list => list.map(u => (u.email === email ? previous : u)));
      toast.error('Update failed. Please try again.');
    } finally {
      setBusy(b => ({ ...b, [email]: false }));
    }
  };

  const toggleStatus = (u) => {
    const status = u.status === 'active' ? 'blocked' : 'active';
    updateUser(u.email, { status },
      () => axiosSecure.patch('/update/user/status', null, { params: { email: u.email, status } }),
      status === 'blocked' ? `${u.name} blocked` : `${u.name} unblocked`);
  };

  const makeVolunteer = async (u) => {
    if (!(await confirm('Make volunteer?', `${u.name} will get volunteer access.`, 'Yes, make volunteer'))) return;

    updateUser(u.email, { role: 'volunteer' },
      () => axiosSecure.patch('/update/user/role', null, { params: { email: u.email, role: 'volunteer' } }),
      `${u.name} is now a volunteer`);
  };

  const makeAdmin = async (u) => {
    if (!(await confirm('Make admin?', `${u.name} will get full admin access.`, 'Yes, make admin'))) return;

    updateUser(u.email, { role: 'admin' },
      () => axiosSecure.patch('/update/user/admin', null, { params: { email: u.email, role: 'admin' } }),
      `${u.name} is now an admin`);
  };

  const roleOptions = (u) => [
    u.role === 'donor' && { label: 'Make Volunteer', icon: <FaUserCheck className="text-accent" />, onClick: () => makeVolunteer(u) },
    (u.role === 'donor' || u.role === 'volunteer') && { label: 'Make Admin', icon: <FaUserShield className="text-primary" />, onClick: () => makeAdmin(u) },
  ].filter(Boolean);

  return (
    <div className="container mx-auto pt-6 pb-16 px-4 lg:px-20 min-h-screen">
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
          All <span className="text-primary">Users</span>
        </h3>
        {!loading && !error && (
          <p className="mt-3 text-base-content/80">{users.length} registered users</p>
        )}
      </div>

      {error ? (
        <div className="text-center py-16">
          <p className="text-error font-semibold mb-4">Couldn’t load users.</p>
          <button className="btn btn-primary" onClick={() => { setLoading(true); fetchUsers(); }}>Retry</button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-300 shadow-md">
          <table className="table min-w-200">
            <thead className="bg-secondary text-white">
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Role actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <SkeletonRows /> : users.map(u => {
                const isSelf = u.email === me?.email;
                const active = u.status === 'active';
                const options = roleOptions(u);
                return (
                  <tr key={u._id} className="hover:bg-base-200 transition-colors">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar avatar-placeholder">
                          {u.mainPhotoUrl ? (
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                              <img src={u.mainPhotoUrl} alt={u.name} referrerPolicy="no-referrer" loading="lazy" />
                            </div>
                          ) : (
                            <div className="w-12 rounded-full bg-primary text-primary-content font-bold">
                              {u.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-heading">
                            {u.name}{isSelf && <span className="ml-2 badge badge-sm badge-ghost">You</span>}
                          </p>
                          <p className="text-sm text-base-content/80">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`badge font-semibold capitalize ${ROLE_BADGE[u.role] || 'badge-ghost'}`}>{u.role}</span>
                    </td>

                    <td>
                      <label
                        className={`flex items-center gap-3 w-fit ${isSelf ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        title={isSelf ? 'You can’t block your own account' : active ? 'Click to block' : 'Click to unblock'}
                      >
                        <input
                          type="checkbox"
                          className="toggle toggle-success"
                          checked={active}
                          disabled={isSelf || busy[u.email]}
                          onChange={() => toggleStatus(u)}
                          aria-label={`${active ? 'Block' : 'Unblock'} ${u.name}`}
                        />
                        <span className={`badge badge-soft font-semibold ${active ? 'badge-success' : 'badge-error'}`}>
                          {active ? 'Active' : 'Blocked'}
                        </span>
                      </label>
                    </td>

                    <td>
                      {options.length > 0 ? (
                        <RoleMenu options={options} disabled={busy[u.email]} />
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-base-content/70">
                          <FaUserTag /> Full access
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;