
import './MainPage.css'

export default function MainPage() {

    return(
        <>
            <div className="mainpage-container">

                <div className="header">

                    <div className="navbar-container">

                        <div className="left-buttons">
                            <div className="logo">Logo</div>
                            <div>Bonus</div>
                            <div>Bonus</div>
                            <div>Bonus</div>
                            <div>Bonus</div>
                        </div>
                        <div className="right-buttons">
                            <div className="Login-butt">Log In</div>
                            <div className="Signup-butt">Signup</div>
                        </div>

                    </div>

                </div>


                <div className="main">
                    <div className="top-container">

                        <div className="main-big-text">
                            <div className='bigtextsales'>
                                <h1>Everscrolls: Navigating Creativity Beneath the Waves</h1>
                                <h2>Dive into the Depths of Productivity</h2>
                                <h3>Welcome to Everscrolls, where productivity meets the mesmerizing allure of the ocean. As you embark on your digital journey, let the sea theme guide you through a world of seamless note-taking, organization, and inspiration.</h3>
                            </div>
                            <div className='signuplowbox'>
                                <button className='signupbutton'>Sign up today!</button>
                                <h3>Already joined the seas? Click me to come abord!</h3>
                            </div>

                        </div>
                        <div className="fake-testimony"></div>

                    </div>
                    <div className="bottom-container">

                        <div className="scroll-features"></div>

                    </div>
                </div>


                <div className="footer">
                    <div>
                    </div>
                </div>

            </div>
        </>
    )
}
