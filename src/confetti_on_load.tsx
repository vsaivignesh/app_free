import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const ConfettiOnLoad = () => {
    const { width, height } = useWindowSize();
    const [num_pieces, setNumPieces] = useState(2500);

    useEffect(() => {
        const timer = setTimeout(() => {
            setNumPieces(0);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="confetti">
                <Confetti
                    width={width}
                    height={height}
                        recycle={false}
                        numberOfPieces={num_pieces}
                        onConfettiComplete={(confetti) => {
                            if (confetti) confetti.reset();
                        }}
                    />
                </div>
        </>
    );
};

export default ConfettiOnLoad;