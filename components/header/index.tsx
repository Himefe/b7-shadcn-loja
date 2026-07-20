import Logo from "@/components/header/logo";
import ThemeToogle from "@/components/theme";
import CartSidebar from "@/components/cart/sidebar";

const Header = () => {
    return (
        <header className="flex justify-between items-center my-5 mx-3 sticky top[1.25rem] z-10 bg-background">
            <div className="flex gap-3 items-center">
                <Logo />
                <ThemeToogle />
            </div>
            <div className="flex items-center gap-3">
                <CartSidebar />
            </div>
        </header>
    );
};

export default Header;
