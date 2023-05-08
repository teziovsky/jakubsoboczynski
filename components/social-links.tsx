import socialLinks from "content/social-links.json";
import { cn } from "helpers";

type Props = {
  className?: string;
};

export default function SocialLinks({ className }: Props) {
  return (
    <ul
      className={cn(className, {
        "fixed z-30 hidden left-[35px] top-1/2 -translate-y-1/2 lg:flex flex-col items-center justify-center gap-y-9":
          !className,
      })}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          <a
            aria-label={link.buttonTitle}
            href={link.url}
            className="social-link"
            rel="noreferrer nofollow noopener"
            target="_blank"
            dangerouslySetInnerHTML={{ __html: link.icon }}></a>
        </li>
      ))}
    </ul>
  );
}
