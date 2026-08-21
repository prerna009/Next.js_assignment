import Footer from "@/components/server/layouts/footer";
import Header from "@/components/server/layouts/header";

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </>
    )
}