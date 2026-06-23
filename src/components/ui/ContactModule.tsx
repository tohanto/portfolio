import type { ContactModuleProps } from '@/types';
import { cn } from '@/utils/cn';

const CONTACT = {
  email: 'yhhan_1107@163.com',
  phone: '13050970961',
  wechat: 'yhhh0846',
};

export function ContactModule({ variant }: ContactModuleProps) {
  const isFullscreen = variant === 'fullscreen';

  if (isFullscreen) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-canvas">
        <div className="text-center px-6 py-16 max-w-[888px] w-full">
          {/* Label */}
          <span className="text-[11px] font-semibold text-ink-muted uppercase" style={{ letterSpacing: '3px' }}>
            CONTACT ME
          </span>

          {/* Heading */}
          <h1 className="mt-8 text-[56px] font-bold text-ink leading-[1.05] whitespace-pre-line" style={{ letterSpacing: '-2px' }}>
            {'让我们一起创造\n非凡的作品'}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-ink-secondary" style={{ fontSize: '18px' }}>
            欢迎随时与我联系！
          </p>

          {/* Contact cards — matching Pixso contact page */}
          <div className="mt-12 flex justify-center gap-6 max-md:flex-col max-md:items-center">
            <ContactFullCard
              icon={<PhoneIcon />}
              label="Phone"
              value={CONTACT.phone}
            />
            <ContactFullCard
              icon={<MailIcon />}
              label="邮件"
              value={CONTACT.email}
              accent
            />
            <ContactFullCard
              icon={<WechatIcon />}
              label="WeChat"
              value={CONTACT.wechat}
            />
          </div>
        </div>
      </div>
    );
  }

  // Section variant — matching Pixso 2:55: dark bg #111111, 399px height, centered
  return (
    <section id="contact" className="scroll-mt-header flex flex-col items-center justify-center" style={{ padding: '80px 60px', backgroundColor: '#111111' }}>
      {/* "CONTACT" label — 10px Semi Bold, #999, letter-spacing 2px, centered */}
      <span className="text-[10px] font-semibold uppercase" style={{ color: '#999999', letterSpacing: '2px' }}>
        CONTACT
      </span>

      {/* Title — 48px Bold, white, letter-spacing -1.5px, line-height 110%, centered */}
      <h2 className="mt-4 text-[48px] font-bold text-ink-inverse leading-[1.1] whitespace-pre-line text-center" style={{ letterSpacing: '-1.5px' }}>
        {'联系我\n让我们一起合作'}
      </h2>

      {/* Subtitle — 16px Regular, #999, centered */}
      <p className="mt-4 text-base text-center" style={{ color: '#999999', fontSize: '16px' }}>
        无论是建筑、游戏、AI还是视觉艺术项目，我都将保持持续探索、深入学习的态度
      </p>

      {/* 3 contact buttons — matching Pixso 2:59: horizontal, gap 16px, 200px × 52px */}
      <div className="mt-8 flex justify-center gap-4 max-md:flex-col max-md:items-center">
        <ContactCardDark
          icon={<PhoneIcon />}
          value={CONTACT.phone}
        />
        <ContactCardDark
          icon={<MailIcon />}
          value={CONTACT.email}
          accent
        />
        <ContactCardDark
          icon={<WechatIcon />}
          value={CONTACT.wechat}
        />
      </div>
    </section>
  );
}

/* ── Full card variant (used on /contact) ── */
function ContactFullCard({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className="w-[280px] border border-rule bg-canvas-white p-8 text-left">
      <div className="h-6 flex items-center mb-3">
        <span className={accent ? 'text-signal' : 'text-ink-secondary'}>{icon}</span>
      </div>
      <p className="text-base font-bold text-ink mb-2">{label}</p>
      <p className={cn('text-sm', accent ? 'text-signal' : 'text-ink-secondary')}>
        {value}
      </p>
    </div>
  );
}

/* ── Dark compact card — matching Pixso 2:60/2:61/13:5: 200×52, border, centered ── */
function ContactCardDark({ icon, value, accent }: { icon: React.ReactNode; value: string; accent?: boolean }) {
  return (
    <div
      className="h-[52px] flex items-center justify-center gap-2"
      style={{
        width: '200px',
        border: accent ? 'none' : '1px solid #555555',
        backgroundColor: accent ? '#CC6600' : 'transparent',
      }}
    >
      <span className={accent ? 'text-ink-inverse' : 'text-ink-inverse'}>{icon}</span>
      <span
        className="font-semibold text-ink-inverse"
        style={{ fontSize: '14px', letterSpacing: '0.5px' }}
      >
        {value}
      </span>
    </div>
  );
}

/* ── Icons ── */
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13L2 4" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function WechatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
    </svg>
  );
}
