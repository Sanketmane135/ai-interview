import "./../globals.css";
import Footer from "@/components/footer";
import Providers from "../providers";



export const metadata = {
  title: "ResumeIQ - Your AI Interview partner",
  description: "Upload your resume and practice tailored interview questions powered by AI. Get instant feedback and boost your confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-white  `}>
      
        <Providers>{children}</Providers>
        <Footer/>
      </body>
    </html>
  );
}
