const API = 'https://jsonplaceholder.typicode.com/users';
const list = document.querySelectorAll('.js-empty');
const refetch = document.querySelectorAll('.refetch');
const activeAnimationSlides = document.querySelectorAll('.animation');

const datafetch = (parent) => fetch(API)
    .then(res => res.json())
    .then(data => data.slice(0, 5).forEach(el => {
        if (parent) {
            parent.insertAdjacentHTML('afterbegin', `<li id=${el.id}>${el.name} <button class="remove-btn">Remove from list</button></li>`)
        } else {
            list.forEach(item => item.insertAdjacentHTML('afterbegin', `<li id=${el.id}>${el.name} <button class="remove-btn">Remove from list</button></li>`))
        }
    }))
    .then(() => {
        const removeBtns = document.querySelectorAll('.remove-btn');

        removeBtns.forEach((el) => {
            el.addEventListener('click', () => {
                el.parentNode.remove();
            })
        })
    })

datafetch();

refetch.forEach((el, idx) => el.addEventListener('click', () => datafetch()));

const resetAnimation = () => {
    document.getAnimations().forEach((anim) => {
        anim.cancel();
        anim.play();
    });
}

document.addEventListener('keydown', () => {
    activeAnimationSlides.forEach(activeAnimationSlide => {
        if (activeAnimationSlide.classList.contains('active')) {
            activeAnimationSlide.querySelectorAll('li').forEach((el, idx) => {
                el.style.setProperty('--index', (idx + 1).toString());
            });
            activeAnimationSlide.querySelector('ul')?.setAttribute('data-animation', 'true');
            resetAnimation();
        }
    })
});