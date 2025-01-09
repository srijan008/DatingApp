import './progressbar.css';

export const Testimonials = () => {
    return (
        <div className=" w-auto pt-[5%] h-[100vh] flex flex-col items-center">
            <div className="text-6xl font-bold">
                Testimonials
            </div>
            <div className="container">
                <div className="skills">
                    <h2>Matched</h2>
                    <div className="progress-bar">
                        <div className="match"><span>86%</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
    }