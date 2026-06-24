const PARTICLES = [
  { left: '15%', dur: '1.8s', del: '0s', size: 3 },
  { left: '28%', dur: '2.2s', del: '0.6s', size: 2 },
  { left: '40%', dur: '1.6s', del: '1.2s', size: 4 },
  { left: '55%', dur: '2.0s', del: '0.3s', size: 2 },
  { left: '68%', dur: '1.9s', del: '0.9s', size: 3 },
  { left: '80%', dur: '2.3s', del: '0.4s', size: 2 },
  { left: '35%', dur: '2.5s', del: '1.6s', size: 3 },
  { left: '62%', dur: '1.7s', del: '0.1s', size: 4 },
  { left: '22%', dur: '2.1s', del: '0.8s', size: 2 },
  { left: '48%', dur: '1.5s', del: '0.5s', size: 3 },
  { left: '72%', dur: '2.4s', del: '1.0s', size: 2 },
  { left: '88%', dur: '1.8s', del: '1.4s', size: 3 },
];

export default function EmberDivider() {
  return (
    <div className="ember-divider">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="ember-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            '--dur': p.dur,
            '--del': p.del,
          }}
        />
      ))}
    </div>
  );
}
