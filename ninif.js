// Éléments DOM
        const page1 = document.getElementById('page1');
        const page2 = document.getElementById('page2');
        const page3 = document.getElementById('page3');
        const page4 = document.getElementById('page4');
        const page5 = document.getElementById('page5');
        const heart = document.getElementById('heart');
        const heartContainer = document.getElementById('heartContainer');
        const blackTransition = document.getElementById('blackTransition');
        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');
        const screamer = document.getElementById('screamer');
        const thinkAgainBtn = document.getElementById('thinkAgainBtn');
        const progressBar = document.getElementById('progressBar');
        const percentage = document.getElementById('percentage');
        const loadingText = document.getElementById('loadingText');
        const downloadMessage = document.getElementById('downloadMessage');
        const cakeBtn = document.getElementById('cakeBtn');
        const secretBtn = document.getElementById('secretBtn');
        const endTimerElement = document.getElementById('endTimer');
        const candle = document.getElementById('candle');
        const flame = document.getElementById('flame');
        const marqueeContainer = document.getElementById('marqueeContainer');
        const marquee = document.getElementById('marquee');
        const tvOff = document.getElementById('tvOff');
        const restartBtn = document.getElementById('restartBtn');
        const musicToggle = document.getElementById('musicToggle');
        const friendPhoto = document.getElementById('friendPhoto');
        
        // UNIQUEMENT la musique d'anniversaire
        const birthdayMusic = document.getElementById('birthdayMusic');
        
        // Variables d'état
        let isMusicPlaying = true;
        let noBtnClicks = 0;
        let isNoBtnMoving = false;
        let shadowInterval;
        let balloonInterval;
        
        // Variables pour la page du gâteau
        let confettiInterval;
        let heartInterval;
        let photoInterval;
        let endTimerInterval;
        let endTime = 25;
        let timerActive = false;
        
        // Démarrer la musique d'anniversaire AUTOMATIQUEMENT
        window.addEventListener('load', function() {
            birthdayMusic.volume = 0.4;
            birthdayMusic.play().catch(function(e) {
                console.log("Audio nécessite une interaction utilisateur - cliquer sur la page");
                document.body.addEventListener('click', function() {
                    birthdayMusic.play();
                }, { once: true });
            });
        });
        
        // Ajouter la police Creepster
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        
        // Cliquer sur le cœur
        heartContainer.addEventListener('click', function() {
            heart.classList.add('heart-black');
            heart.style.animation = 'none';
            
            setTimeout(function() {
                blackTransition.classList.add('active');
                
                setTimeout(function() {
                    heart.classList.add('heart-shrink');
                    page1.style.display = 'none';
                    
                    setTimeout(function() {
                        blackTransition.classList.remove('active');
                        page2.style.display = 'flex';
                        createShadows();
                        startShadowGeneration();
                    }, 1000);
                }, 1000);
            }, 500);
        });
        
        // Fonction pour créer des ombres volantes
        function createShadows() {
            for (let i = 0; i < 12; i++) {
                createSingleShadow(i);
            }
        }
        
        function createSingleShadow(index) {
            const shadow = document.createElement('div');
            shadow.classList.add('shadow');
            
            const topPosition = Math.random() * 80 + 10;
            const width = Math.random() * 150 + 100;
            const height = Math.random() * 40 + 40;
            
            shadow.style.top = topPosition + '%';
            shadow.style.width = width + 'px';
            shadow.style.height = height + 'px';
            
            const delay = Math.random() * 10;
            shadow.style.animation = 'shadowMove ' + (Math.random() * 10 + 8) + 's infinite linear';
            shadow.style.animationDelay = delay + 's';
            shadow.style.opacity = Math.random() * 0.5 + 0.3;
            
            page2.appendChild(shadow);
            
            setTimeout(function() {
                if (shadow.parentNode) {
                    shadow.parentNode.removeChild(shadow);
                }
            }, (delay + 12) * 1000);
        }
        
        function startShadowGeneration() {
            if (shadowInterval) {
                clearInterval(shadowInterval);
            }
            
            shadowInterval = setInterval(function() {
                if (page2.style.display === 'flex') {
                    createSingleShadow(0);
                }
            }, Math.random() * 2000 + 2000);
        }
        
        // Gérer le bouton OUI
        yesBtn.addEventListener('click', function() {
            if (shadowInterval) {
                clearInterval(shadowInterval);
            }
            
            page2.style.display = 'none';
            page3.style.display = 'flex';
            startDownloadAnimation();
        });
        
        function startDownloadAnimation() {
            let progress = 0;
            const totalTime = 6000;
            const intervalTime = 50;
            const increments = 100 / (totalTime / intervalTime);
            
            const loadingMessages = [
                "Préparation du gâteau...",
                "Chargement des confettis...",
                "Téléchargement des prières...",
                "Compression des fishas...",
                "Tu as intérêt à aimer TCHRRRRR..."
            ];
            
            const downloadMessages = [
                "Wait please, the page is loading...",
                "Btw, you are really getting old...",
                "Like... Bro go get mariedddd!!",
                "Not to me because you sacre meeeeee olalala..."
            ];
            
            const downloadInterval = setInterval(function() {
                progress += increments;
                progressBar.style.width = Math.min(progress, 100) + '%';
                percentage.textContent = Math.round(Math.min(progress, 100)) + '%';
                
                if (progress < 20) {
                    loadingText.textContent = loadingMessages[0];
                    downloadMessage.textContent = downloadMessages[0];
                } else if (progress < 40) {
                    loadingText.textContent = loadingMessages[1];
                    downloadMessage.textContent = downloadMessages[1];
                } else if (progress < 60) {
                    loadingText.textContent = loadingMessages[2];
                    downloadMessage.textContent = downloadMessages[2];
                } else if (progress < 80) {
                    loadingText.textContent = loadingMessages[3];
                    downloadMessage.textContent = downloadMessages[3];
                } else {
                    loadingText.textContent = loadingMessages[4];
                    downloadMessage.textContent = "Terminé! Redirection en cours...";
                }
                
                if (progress >= 100) {
                    clearInterval(downloadInterval);
                    setTimeout(function() {
                        page3.style.display = 'none';
                        page4.style.display = 'flex';
                        createBalloons();
                        startBalloonGeneration();
                    }, 1000);
                }
            }, intervalTime);
        }
        
        function createBalloons() {
            const balloonColors = ['#ff4081', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0', '#FF9800', '#00BCD4'];
            
            for (let i = 0; i < 20; i++) {
                createSingleBalloon(i, balloonColors);
            }
        }
        
        function createSingleBalloon(index, colors) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            const leftPosition = Math.random() * 85 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 40 + 60;
            
            balloon.style.left = leftPosition + '%';
            balloon.style.width = size + 'px';
            balloon.style.height = (size * 1.25) + 'px';
            balloon.style.backgroundColor = color;
            balloon.style.animationDuration = (Math.random() * 10 + 10) + 's';
            balloon.style.animationDelay = (Math.random() * 5) + 's';
            
            const string = document.createElement('div');
            string.classList.add('balloon-string');
            balloon.appendChild(string);
            
            page4.appendChild(balloon);
            
            setTimeout(function() {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, (parseFloat(balloon.style.animationDuration) + parseFloat(balloon.style.animationDelay || 0)) * 1000);
        }
        
        function startBalloonGeneration() {
            if (balloonInterval) {
                clearInterval(balloonInterval);
            }
            
            const balloonColors = ['#ff4081', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0', '#FF9800', '#00BCD4'];
            
            balloonInterval = setInterval(function() {
                if (page4.style.display === 'flex') {
                    createSingleBalloon(0, balloonColors);
                }
            }, Math.random() * 2000 + 1000);
        }
        
        // Bouton "Eat a Cake"
        cakeBtn.addEventListener('click', function() {
            if (balloonInterval) {
                clearInterval(balloonInterval);
            }
            
            page4.style.display = 'none';
            page5.style.display = 'flex';
            marqueeContainer.style.display = 'block';
            endTimerElement.style.display = 'block';
            startEndTimer();
            
            setTimeout(function() {
                createDancingPhotos();
                createFloatingHearts();
                startBackgroundConfetti();
            }, 1000);
        });
        
        // Bouton "See the Secret"
        secretBtn.addEventListener('click', function() {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            
            const secretMessage = document.createElement('div');
            secretMessage.style.position = 'fixed';
            secretMessage.style.top = '50%';
            secretMessage.style.left = '50%';
            secretMessage.style.transform = 'translate(-50%, -50%)';
            secretMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            secretMessage.style.padding = '30px';
            secretMessage.style.borderRadius = '20px';
            secretMessage.style.zIndex = '10000';
            secretMessage.style.textAlign = 'center';
            secretMessage.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
            secretMessage.style.border = '5px solid #2196f3';
            secretMessage.innerHTML = `
                <h2 style="color: #2196f3; margin-bottom: 15px;">🎉 Do you love the secret Babe ?? 🎉</h2>
                <p style="color: #333; font-size: 1.2rem; margin-bottom: 20px;">
                    Now you can eat your cake my lovely nigga 🍰 <br>
                    Don't forget: I Will Never Give You Up !!

                </p>
                <button id="closeSecret" style="
                    background: linear-gradient(145deg, #ff4081, #d81b60);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 10px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    font-weight: bold;
                ">Thanx Maty 🥰​ You are the best! </button>
            `;
            
            document.body.appendChild(secretMessage);
            
            document.getElementById('closeSecret').addEventListener('click', function() {
                document.body.removeChild(secretMessage);
            });
        });
        
        // Fonction pour démarrer le timer de fin
        function startEndTimer() {
            endTime = 25;
            timerActive = true;
            
            endTimerInterval = setInterval(function() {
                if (timerActive && page5.style.display === 'flex') {
                    endTime--;
                    endTimerElement.textContent = "Fin dans: " + endTime + "s";
                    
                    if (endTime <= 5) {
                        endTimerElement.style.color = '#ff444407';
                        endTimerElement.style.borderColor = '#ff444400';
                        endTimerElement.style.animation = 'pulse 0.5s infinite';
                    }
                    
                    if (endTime <= 0) {
                        clearInterval(endTimerInterval);
                        endSite();
                    }
                }
            }, 1000);
        }
        
        // Fonction pour terminer le site
        function endSite() {
            birthdayMusic.pause();
            timerActive = false;
            if (confettiInterval) clearInterval(confettiInterval);
            if (heartInterval) clearInterval(heartInterval);
            if (photoInterval) clearInterval(photoInterval);
            
            tvOff.style.display = 'flex';
            
            setTimeout(function() {
                restartBtn.style.display = 'block';
            }, 3500);
        }
        
        // Fonction pour créer des photos dansantes
        function createDancingPhotos() {
            const photoUrls = [
                'images/hehe01.jpeg',
                'images/hehe02.jpeg',
                'images/djahle.jpeg',
                'images/earlob.jpeg'
            ];
            
            if (photoInterval) {
                clearInterval(photoInterval);
            }
            
            for (let i = 0; i < 8; i++) {
                setTimeout(function() {
                    createSingleDancingPhoto(i, photoUrls);
                }, i * 300);
            }
            
            photoInterval = setInterval(function() {
                if (page5.style.display === 'flex' && timerActive) {
                    createSingleDancingPhoto(0, photoUrls);
                }
            }, 3000);
        }
        
        function createSingleDancingPhoto(index, photoUrls) {
            const img = document.createElement('img');
            img.classList.add('dancing-photos');
            img.src = photoUrls[index % photoUrls.length];
            
            const startX = Math.random() * 80 + 10;
            const startY = Math.random() * 80 + 10;
            
            img.style.left = startX + '%';
            img.style.top = startY + '%';
            img.style.opacity = '0';
            
            document.body.appendChild(img);
            
            img.animate([
                { opacity: 0, transform: 'scale(0) rotate(0deg)' },
                { opacity: 1, transform: 'scale(1) rotate(360deg)' }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            img.style.opacity = '1';
            
            let danceFrame = 0;
            const danceInterval = setInterval(function() {
                if (!img.parentNode || !timerActive) {
                    clearInterval(danceInterval);
                    return;
                }
                
                danceFrame++;
                const x = startX + Math.sin(danceFrame / 20) * 30;
                const y = startY + Math.cos(danceFrame / 25) * 25;
                const rotation = Math.sin(danceFrame / 15) * 20;
                const scale = 1 + Math.sin(danceFrame / 30) * 0.2;
                
                img.style.left = x + '%';
                img.style.top = y + '%';
                img.style.transform = 'rotate(' + rotation + 'deg) scale(' + scale + ')';
            }, 50);
            
            setTimeout(function() {
                if (img.parentNode) {
                    img.animate([
                        { opacity: 1, transform: 'scale(1)' },
                        { opacity: 0, transform: 'scale(0)' }
                    ], {
                        duration: 1000,
                        easing: 'ease-in'
                    });
                    
                    setTimeout(function() {
                        if (img.parentNode) {
                            img.parentNode.removeChild(img);
                        }
                    }, 1000);
                }
                clearInterval(danceInterval);
            }, 15000);
        }
        
        // Fonction pour créer des cœurs flottants
        function createFloatingHearts() {
            if (heartInterval) {
                clearInterval(heartInterval);
            }
            
            for (let i = 0; i < 15; i++) {
                setTimeout(function() {
                    createSingleFloatingHeart(i);
                }, i * 200);
            }
            
            heartInterval = setInterval(function() {
                if (page5.style.display === 'flex' && timerActive) {
                    createSingleFloatingHeart(0);
                }
            }, 2000);
        }
        
        function createSingleFloatingHeart(index) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            
            const startX = Math.random() * 90 + 5;
            
            heart.style.left = startX + '%';
            heart.style.top = '105%';
            heart.style.opacity = '0';
            
            document.body.appendChild(heart);
            
            heart.animate([
                { opacity: 0, transform: 'scale(0) translateY(0)' },
                { opacity: 1, transform: 'scale(1) translateY(0)' }
            ], {
                duration: 500,
                easing: 'ease-out'
            });
            
            heart.style.opacity = '1';
            
            const startTime = Date.now();
            const duration = 8000 + Math.random() * 4000;
            
            function animateHeart() {
                if (!heart.parentNode || !timerActive) return;
                
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (progress >= 1) {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                    return;
                }
                
                const y = 105 - (progress * 100);
                const x = startX + Math.sin(progress * Math.PI * 4) * 10;
                const rotation = progress * 360;
                const scale = 0.8 + Math.sin(progress * Math.PI * 2) * 0.2;
                
                heart.style.top = y + '%';
                heart.style.left = x + '%';
                heart.style.transform = 'rotate(' + rotation + 'deg) scale(' + scale + ')';
                requestAnimationFrame(animateHeart);
            }
            
            animateHeart();
        }
        
        // Fonction pour démarrer les confettis de fond
        function startBackgroundConfetti() {
            if (confettiInterval) {
                clearInterval(confettiInterval);
            }
            
            for (let i = 0; i < 30; i++) {
                setTimeout(function() {
                    createSingleConfetti();
                }, i * 100);
            }
            
            confettiInterval = setInterval(function() {
                if (page5.style.display === 'flex' && timerActive) {
                    createSingleConfetti();
                }
            }, 300);
        }
        
        function createSingleConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-continuous');
            
            const startX = Math.random() * 100;
            
            const colors = ['#ff4081', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0', '#FF9800', '#00BCD4', '#E91E63'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const size = Math.random() * 15 + 10;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.borderRadius = '3px';
                confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            }
            
            confetti.style.left = startX + '%';
            confetti.style.top = '-5%';
            confetti.style.opacity = '0';
            
            document.body.appendChild(confetti);
            
            const duration = 3000 + Math.random() * 4000;
            const startTime = Date.now();
            
            function animateConfetti() {
                if (!confetti.parentNode || !timerActive) return;
                
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                if (progress >= 1) {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                    return;
                }
                
                const y = -5 + (progress * 110);
                const x = startX + Math.sin(progress * Math.PI * 6) * 15;
                const rotation = progress * 720;
                const opacity = 1 - progress * 0.5;
                
                confetti.style.top = y + '%';
                confetti.style.left = x + '%';
                confetti.style.transform = 'rotate(' + rotation + 'deg)';
                confetti.style.opacity = opacity;
                requestAnimationFrame(animateConfetti);
            }
            
            animateConfetti();
        }
        
        // Souffler la bougie
        candle.addEventListener('click', function() {
            flame.style.animation = 'flameOut 0.5s forwards';
            
            setTimeout(function() {
                const wishText = document.querySelector('.wish-text');
                wishText.textContent = "Happy Birthday! 🎉🎂";
                wishText.style.animation = 'textGlow 1s infinite alternate';
                wishText.style.color = '#4CAF50';
                wishText.style.textShadow = '0 0 20px #4CAF50, 0 0 40px #4CAF50';
            }, 500);
            
            for (let i = 0; i < 100; i++) {
                setTimeout(function() {
                    createExplosionConfetti();
                }, i * 20);
            }
            
            if (confettiInterval) {
                clearInterval(confettiInterval);
                confettiInterval = setInterval(function() {
                    if (page5.style.display === 'flex' && timerActive) {
                        createSingleConfetti();
                    }
                }, 150);
            }
        });
        
        // Fonction pour les confettis d'explosion
        function createExplosionConfetti() {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-continuous');
            
            const centerX = 50;
            const centerY = 50;
            
            const colors = ['#ff4081', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const size = Math.random() * 20 + 15;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            confetti.style.left = centerX + '%';
            confetti.style.top = centerY + '%';
            confetti.style.opacity = '1';
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            let vx = Math.cos(angle) * speed;
            let vy = Math.sin(angle) * speed;
            
            const rotationSpeed = (Math.random() - 0.5) * 10;
            
            let x = centerX;
            let y = centerY;
            let rotation = 0;
            let opacity = 1;
            const gravity = 0.05;
            
            function animateExplosion() {
                if (!confetti.parentNode) return;
                
                x += vx;
                y += vy;
                vy += gravity;
                rotation += rotationSpeed;
                opacity -= 0.01;
                
                confetti.style.left = x + '%';
                confetti.style.top = y + '%';
                confetti.style.transform = 'rotate(' + rotation + 'deg)';
                confetti.style.opacity = opacity;
                
                if (opacity <= 0 || y > 105) {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                    return;
                }
                
                requestAnimationFrame(animateExplosion);
            }
            
            animateExplosion();
        }
        
        // Gérer le bouton NON
        noBtn.addEventListener('click', function(e) {
            noBtnClicks++;
            
            if (noBtnClicks === 1) {
                if (shadowInterval) {
                    clearInterval(shadowInterval);
                }
                
                birthdayMusic.pause();
                screamer.style.display = 'flex';
            } else {
                if (!isNoBtnMoving) {
                    isNoBtnMoving = true;
                    moveNoButton();
                }
            }
        });
        
        // Bouton "Think Again"
        thinkAgainBtn.addEventListener('click', function() {
            screamer.style.display = 'none';
            
            if (isMusicPlaying) {
                birthdayMusic.play();
            }
            
            if (page2.style.display === 'flex') {
                startShadowGeneration();
            }
            
            isNoBtnMoving = true;
            moveNoButton();
        });
        
        // Fonction pour déplacer le bouton NON
        function moveNoButton() {
            const maxX = window.innerWidth - noBtn.offsetWidth;
            const maxY = window.innerHeight - noBtn.offsetHeight;
            
            const moveInterval = setInterval(function() {
                if (isNoBtnMoving && screamer.style.display !== 'flex') {
                    const randomX = Math.random() * maxX;
                    const randomY = Math.random() * maxY;
                    
                    noBtn.style.position = 'fixed';
                    noBtn.style.left = randomX + 'px';
                    noBtn.style.top = randomY + 'px';
                    noBtn.style.zIndex = '10000';
                }
            }, 400);
            
            setTimeout(function() {
                clearInterval(moveInterval);
            }, 30000);
        }
        
        // Bouton de retour à la première page
        restartBtn.addEventListener('click', function() {
            timerActive = false;
            
            if (shadowInterval) clearInterval(shadowInterval);
            if (balloonInterval) clearInterval(balloonInterval);
            if (confettiInterval) clearInterval(confettiInterval);
            if (heartInterval) clearInterval(heartInterval);
            if (photoInterval) clearInterval(photoInterval);
            if (endTimerInterval) clearInterval(endTimerInterval);
            
            endTimerElement.style.display = 'none';
            endTimerElement.style.color = '#FFD700';
            endTimerElement.style.borderColor = '#FFD700';
            endTimerElement.style.animation = 'none';
            
            page1.style.display = 'flex';
            page2.style.display = 'none';
            page3.style.display = 'none';
            page4.style.display = 'none';
            page5.style.display = 'none';
            marqueeContainer.style.display = 'none';
            tvOff.style.display = 'none';
            restartBtn.style.display = 'none';
            screamer.style.display = 'none';
            blackTransition.classList.remove('active');
            
            noBtnClicks = 0;
            isNoBtnMoving = false;
            
            heart.classList.remove('heart-black');
            heart.classList.remove('heart-shrink');
            heart.style.animation = 'heartbeat 1.2s infinite';
            heart.style.backgroundColor = '#ff4081';
            
            const heartBefore = document.querySelector('.heart:before');
            const heartAfter = document.querySelector('.heart:after');
            if (heartBefore) heartBefore.style.backgroundColor = '#ff4081';
            if (heartAfter) heartAfter.style.backgroundColor = '#ff4081';
            
            noBtn.style.position = '';
            noBtn.style.left = '';
            noBtn.style.top = '';
            noBtn.style.zIndex = '';
            
            progressBar.style.width = '0%';
            percentage.textContent = '0%';
            loadingText.textContent = 'Préparation du gateau...';
            downloadMessage.textContent = 'Veuillez patienter pendant le chargement...';
            
            flame.style.display = 'block';
            flame.style.animation = 'flicker 0.8s infinite alternate, flameFloat 3s infinite ease-in-out';
            
            birthdayMusic.currentTime = 0;
            birthdayMusic.volume = 0.4;
            birthdayMusic.play();
            
            const allDynamicElements = document.querySelectorAll('.dancing-photos, .floating-heart, .confetti-continuous, .shadow, .balloon');
            allDynamicElements.forEach(function(element) {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        });
        
        // Contrôle de la musique
        musicToggle.addEventListener('click', function() {
            if (isMusicPlaying) {
                birthdayMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                birthdayMusic.play();
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            
            isMusicPlaying = !isMusicPlaying;
        });
        
        console.log("INSTRUCTIONS POUR AJOUTER LES IMAGES:");
        console.log("1. Pour le reaper background (page 2):");
        console.log("   - Remplace 'TON_IMAGE_REAPER_ICI' dans le CSS par l'URL de ton image");
        console.log("");
        console.log("2. Pour le bride background (page 4):");
        console.log("   - Remplace 'TON_IMAGE_MARIEE_ICI' dans le CSS par l'URL de ton image");
        console.log("");
        console.log("3. Pour la photo de l'ami (page 5):");
        console.log("   - Remplace l'URL dans la balise img avec id='friendPhoto'");
        console.log("");
        console.log("4. Pour le lien secret (bouton See the Secret):");
        console.log("   - Dans le JavaScript, remplace 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'");
        console.log("   - Mets ton propre lien secret");