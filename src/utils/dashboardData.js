const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const STATUS_META = {
    pending: { label: 'Pending', color: '#F59E0B' },
    inprogress: { label: 'In Progress', color: '#3B82F6' },
    done: { label: 'Completed', color: '#22C55E' },
    canceled: { label: 'Canceled', color: '#EF4444' },
};

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const byBloodGroup = (requests = []) =>
    BLOOD_GROUPS.map(bg => ({
        group: bg,
        requests: requests.filter(r => r.blood_group === bg).length,
    }));

export const byStatus = (requests = []) =>
    Object.entries(STATUS_META)
        .map(([key, meta]) => ({
            name: meta.label,
            value: requests.filter(r => r.donation_status === key).length,
            color: meta.color,
        }))
        .filter(item => item.value > 0);

const monthKey = (value) => {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d)) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const monthLabel = (key) => {
    const [y, m] = key.split('-');
    return `${MONTHS[Number(m) - 1]} ${y.slice(2)}`;
};

// last 6 months that have any activity: requests (by donation_date) + funding (by paidAt)
export const byMonth = (requests = [], funds = []) => {
    const map = {};
    requests.forEach(r => {
        const k = monthKey(r.donation_date);
        if (!k) return;
        map[k] = map[k] || { requests: 0, funding: 0 };
        map[k].requests += 1;
    });
    funds.forEach(f => {
        const k = monthKey(f.paidAt);
        if (!k) return;
        map[k] = map[k] || { requests: 0, funding: 0 };
        map[k].funding += Number(f.amount) || 0;
    });
    return Object.keys(map)
        .sort()
        .slice(-6)
        .map(k => ({ month: monthLabel(k), ...map[k] }));
};