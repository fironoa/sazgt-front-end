import React, {useState, useEffect} from 'react'

const IncrementCounter = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Only start the interval if the current count is less than the target
        if (count < target) {
            const intervalId = setInterval(() => {
                setCount((prevCount) => prevCount + 16);
            }, 1000 / target); // Adjust the speed as needed

            // Clear the interval when the component unmounts or count reaches the target
            return () => clearInterval(intervalId);
        }
    }, [count, target]); // Depend on count and target so the effect runs when they change

    return (
        <h2 style={{
            fontSize: "2.4rem"
        }}>{count}+</h2>
    );


}

export default IncrementCounter