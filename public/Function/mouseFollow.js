document.addEventListener('mousemove', function(e) {
    var colors = ['rgb(118, 54, 121)', 'rgb(55, 54, 121)', 'rgb(54, 100, 121)'];
    var circle = document.createElement('div');
    circle.classList.add('circle');
    document.body.appendChild(circle);

    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    circle.style.backgroundColor = randomColor;

    circle.style.left = e.pageX + 'px';
    circle.style.top = e.pageY + 'px';

    setTimeout(function(){
        circle.remove();
    }, 1000)
});