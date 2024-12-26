import SideBar from '../components/sidebar'
import PropTypes from "prop-types";

const Layout = ({ children }) => {

    return (
        <div className="flex min-h-screen overflow-hidden">
            <SideBar className="" />
            <main className="w-full">
                <div className=" p-5">
                    {children}
                </div>

            </main>
        </div>
    );
};
Layout.propTypes = {
    children: PropTypes.node.isRequired,
    // title: PropTypes.string.isRequired,
};
export default Layout;