import { useEffect } from 'react';
import useFlashMessageContext from 'hooks/useFlashMessageContext';


const useFadeOutFlashMessage = () => {
    const { message, success, info, error, resetFlashMessage } = useFlashMessageContext();

    useEffect(() => {
        let timer;

        if (!error) {
            timer = setTimeout(() => {
                resetFlashMessage()
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [message, resetFlashMessage, error]);
}

export default useFadeOutFlashMessage;