import {TLoginButton, TLoginButtonSize} from "react-telegram-auth";

const WebHome = () => {
    return (
        <>
            <TLoginButton
                botName={import.meta.env.VITE_APP_BOT}
                buttonSize={TLoginButtonSize.Large}
                lang="en"
                usePic={false}
                cornerRadius={20}
                redirectUrl={"https://tl.sharkgou.com/web/tgInit/"+ import.meta.env.VITE_APP_HEAD}
                // onAuthCallback={(user) => {
                //     console.log('Hello, user!', user);
                // }}
                requestAccess={'write'}
                // additionalClasses={'css-class-for-wrapper'}
            />
        </>
    )
}

export default WebHome;
