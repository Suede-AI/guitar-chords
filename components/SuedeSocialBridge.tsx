type SocialAction = {
  label: string;
  href: string;
};

type SuedeSocialBridgeProps = {
  source: string;
  eyebrow?: string;
  title: string;
  body: string;
  primary?: SocialAction;
  secondary?: SocialAction;
};

const SOCIAL_BASE = "https://social.suedeai.ai";

function socialUrl(path: string, source: string, content: string) {
  const url = new URL(path, SOCIAL_BASE);
  url.searchParams.set("utm_source", "guitarchords.info");
  url.searchParams.set("utm_medium", "tool_cta");
  url.searchParams.set("utm_campaign", "guitar_tools_to_social");
  url.searchParams.set("utm_content", `${source}_${content}`);
  return url.toString();
}

export function socialAction(path: string, label: string, source: string, content: string): SocialAction {
  return {
    label,
    href: socialUrl(path, source, content),
  };
}

export function SuedeSocialBridge({
  source,
  eyebrow = "Suede Social",
  title,
  body,
  primary = socialAction("/", "Claim your handle", source, "claim_handle"),
  secondary = socialAction("/forum", "Ask the room", source, "forum"),
}: SuedeSocialBridgeProps) {
  return (
    <aside className="social-bridge" aria-label={eyebrow}>
      <div className="social-bridge__copy">
        <span className="eyebrow eyebrow--cyan">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="social-bridge__actions">
        <a href={primary.href} className="btn-primary">
          {primary.label}
        </a>
        <a href={secondary.href} className="btn-ghost">
          {secondary.label}
        </a>
      </div>
    </aside>
  );
}
