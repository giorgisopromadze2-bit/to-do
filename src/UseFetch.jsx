import { useEffect, useState } from "react";

const UseFetch = (url) => {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        setIsLoading(true);

        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for the resource');
            }

            return res.json();
        })
        .then(task => {
            setTasks(task);
            setError(null);
            setIsLoading(false);
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted');
            }else{
                setError(err.message);
                setIsLoading(false);
            }
        })

        return () => abortCont.abort();

    }, [url]);

    return {tasks, setTasks, error, isLoading}
}
 
export default UseFetch;