import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const Coin = () => {
    useEffect(() => {
        const likeButton = document.getElementById("like");

        likeButton.addEventListener("click", () => {
            likeOrLove(likeButton);
        });

        function likeOrLove(button) {
            if (!button.classList.contains("clicked")) {
                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                }

                setTimeout(() => {
                    confetti({
                        particleCount: 300,
                        spread: 100,
                        origin: { y: 1 }
                    });
                }, 400);
                button.classList.add("clicked");
                setTimeout(() => {
                    button.classList.remove("clicked");
                }, 800);
            }
        }
    }, []);

    return (
        <div className="coin-div round-button" type="button" id="like">
          
        </div>
    );
};

export default Coin;
