import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>dsapr's blog</title>
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
