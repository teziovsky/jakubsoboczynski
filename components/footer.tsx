import { cn } from "helpers";

type Props = {
  className?: string;
};

export default function Footer({ className }: Props) {
  return (
    <footer
      className={cn(className, "flex items-center justify-center flex-col", {
        "py-12": !className,
      })}>
      <svg
        className="w-4 mb-4 lg:mr-1"
        fill="none"
        height="11"
        viewBox="0 0 17 11"
        width="17"
        xmlns="http://www.w3.org/2000/svg">
        <title>Ikona separatora stopki</title>
        <path
          className="fill-current stroke-current transition-colors"
          d="M0 4.69308L1.47018 4.76979C1.61081 2.92888 2.96591 1.84223 4.78125 1.85501C6.07244 1.85501 6.92899 2.4303 8.05399 3.26126C9.35796 4.27121 10.4702 4.9999 12.0554 4.9999C14.3693 5.01269 16.3764 3.54252 16.7088 0.793935L15.2386 0.65331C14.983 2.41752 13.7173 3.54251 12.0426 3.54251C10.9048 3.52973 10.125 3.00558 9.03836 2.1874C7.7216 1.17746 6.5071 0.397629 4.75568 0.384845C2.27556 0.37206 0.178977 1.90615 0 4.69308Z"
        />
        <path
          className="fill-current stroke-current transition-colors"
          d="M0 10.6931L1.47018 10.7698C1.61081 8.92888 2.96591 7.84223 4.78125 7.85501C6.07244 7.85501 6.92899 8.4303 8.05399 9.26126C9.35796 10.2712 10.4702 10.9999 12.0554 10.9999C14.3693 11.0127 16.3764 9.54251 16.7088 6.79393L15.2386 6.65331C14.983 8.41751 13.7173 9.54251 12.0426 9.54251C10.9048 9.52973 10.125 9.00558 9.03836 8.1874C7.7216 7.17746 6.5071 6.39763 4.75568 6.38484C2.27556 6.37206 0.178977 7.90615 0 10.6931Z"
          fill="white"
        />
      </svg>
      <div className="flex flex-col items-center text-sm font-light gap-3 lg:flex-row">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            aria-label="Przejdź do konta Teziovsky w serwisie GitHub.pl"
            className="link"
            href="https://www.github.com/teziovsky"
            rel="noreferrer nofollow noopener"
            target="_blank">
            Jakub Soboczyński
          </a>
        </p>
        <svg className="w-4" fill="none" viewBox="0 0 29 62" xmlns="http://www.w3.org/2000/svg">
          <title>Ikona separatora praw autorskich</title>
          <path
            d="M24.2716 27.66L14.5216 57L4.79141 27.72M24.2716 27.66L27.0431 19.32L14.5216 3L2 19.32L4.79141 27.72M24.2716 27.66L14.5216 15L4.79141 27.72"
            className="stroke-current transition-colors"
            strokeWidth="3"
          />
        </svg>
        <p>Wszelkie prawa zastrzeżone</p>
      </div>
    </footer>
  );
}
