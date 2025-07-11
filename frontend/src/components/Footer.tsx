import { Activity } from "lucide-react";
import '../App.css'

const Footer: React.FC = () => {
    return (
        <footer className="w-full px-4 py-6 flex flex-col items-center md:flex-row md:justify-between md:items-center footer-gradient">
            {/* Left Section */}
            <div className="flex flex-col items-center md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Activity className="w-8 h-8 text-indigo-500 mr-2" />
                        <span className="text-xl font-bold text-white">PostureAI</span>
                    </div>
                </div>
                <p className="text-lg text-gray-200">| 2025 Copyright</p>
            </div>

            {/* Social Icons Section */}
            <div className="flex justify-center mt-4 md:mt-0">
                <section className="w-80">
                    <div className="flex justify-center space-x-6">
                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/ig__rahul70/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-pink-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.5 2C4.5 2 2 4.5 2 7.5v9c0 3 2.5 5.5 5.5 5.5h9c3 0 5.5-2.5 5.5-5.5v-9C22 4.5 19.5 2 16.5 2h-9zm9 2c2.2 0 3.5 1.3 3.5 3.5v9c0 2.2-1.3 3.5-3.5 3.5h-9c-2.2 0-3.5-1.3-3.5-3.5v-9C5 5.3 6.3 4 7.5 4h9zM12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c1.6 0 3 1.4 3 3s-1.4 3-3 3-3-1.4-3-3 1.4-3 3-3zm5-1.5c-.4 0-.75-.3-.75-.75s.3-.75.75-.75.75.3.75.75-.35.75-.75.75z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/rahul-malll-85989327b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M2.5 3C1.7 3 1 3.7 1 4.5v15c0 .8.7 1.5 1.5 1.5h19c.8 0 1.5-.7 1.5-1.5v-15c0-.8-.7-1.5-1.5-1.5h-19zm4 3c1.1 0 2 1 2 2 0 1.1-.9 2-2 2s-2-.9-2-2c0-1.1.9-2 2-2zm.5 4H4v8H7v-8zm4 0v8h3v-4c0-1 .4-2 1.5-2s1.5 1 1.5 2v4h3v-4.5c0-2.5-1.5-3.5-3.5-3.5-1.5 0-2.4.7-3 1.5v-1h-3z" />
                            </svg>
                        </a>

                        {/* GitHub */}
                        <a
                            href="https://github.com/Rahul1038402"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 6.9 9.8.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.3-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7 0-.2-.3-1 .1-2 0 0 .8-.2 2.8 1 .8-.2 1.8-.4 2.7-.4s1.9.1 2.7.4c2-.2 2.8-1 2.8-1 .5 1 .2 1.8.1 2 .7.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.4 6.9-5.3 6.9-9.8C22 6.6 17.5 2 12 2z" />
                            </svg>
                        </a>
                    </div>
                </section>
            </div>
        </footer>
    );
}
export default Footer;
