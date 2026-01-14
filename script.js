// Parallax effect for profile image
document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('profile-image');
    const container = document.getElementById('parallax-container');
    
    if (!image || !container) return;
    
    // Parallax effect on mouse move
    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        // Adjust these values to control the movement intensity
        const moveX = x * 20; // 20px maximum movement
        const moveY = y * 20;
        const rotateY = x * 10; // 10 degrees maximum rotation
        const rotateX = y * -10;
        
        // Apply the transformation
        image.style.transform = `translate(${moveX}px, ${moveY}px) 
                               rotateY(${rotateY}deg) 
                               rotateX(${rotateX}deg) 
                               scale(1.05)`;
        
        // Add a subtle shadow that follows mouse
        container.style.boxShadow = `
            ${-x * 15}px ${-y * 15}px 30px rgba(0,0,0,0.2),
            0 10px 20px rgba(0,0,0,0.1)
        `;
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
        image.style.transform = 'translate(0, 0) rotateY(0) rotateX(0) scale(1)';
        image.style.transition = 'transform 0.5s ease';
        container.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        
        // Reset transition after animation
        setTimeout(() => {
            image.style.transition = 'transform 0.1s ease-out';
        }, 500);
    });
    
    // Reset on mouse enter (remove transition)
    container.addEventListener('mouseenter', () => {
        image.style.transition = 'transform 0.1s ease-out';
    });
    
    // Optional: Add a subtle floating animation when not hovering
    function addFloatingAnimation() {
        if (!container.matches(':hover')) {
            const time = Date.now() * 0.001;
            const floatX = Math.sin(time * 0.5) * 3;
            const floatY = Math.cos(time * 0.7) * 3;
            
            image.style.transform = `translate(${floatX}px, ${floatY}px)`;
            requestAnimationFrame(addFloatingAnimation);
        }
    }
    
    // Start floating animation when page loads
    setTimeout(() => {
        if (!container.matches(':hover')) {
            addFloatingAnimation();
        }
    }, 1000);
    
    // Add click effect
    container.addEventListener('click', () => {
        image.style.transform = 'scale(0.95)';
        setTimeout(() => {
            image.style.transform = 'scale(1)';
        }, 150);
    });
});