import logo from "../../assets/clipboard.png"

const Navbar = () => {
    return (
        <div className="w-full py-8 bg-slate-100 f text-center">
            <div className="w-fit flex items-center justify-center gap-3 mx-auto">
                <img className="w-7 h-7" src={logo} alt="" />
                <h2 className="font-semibold text-2xl font1">Task Management</h2>
            </div>
        </div>
    );
};

export default Navbar;