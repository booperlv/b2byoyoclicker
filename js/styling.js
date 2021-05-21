Split(['#ConfigureMenu', '#MiddlePortion', '#Player'], {
    elementStyle: function (dimension, size) {
        return { width: +size + 'vw' };
    },
    sizes: [10, 80, 10],
    gutterSize: 0.2,
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'em',
        };
    },
});

Split(['#MediaDisplay', '#JudgeClickerDir'], {
    direction: 'vertical',
    gutterAlign: 'start',
    elementStyle: function (dimension, size) {
        return { height: +size + '%' };
    },
    sizes: [85, 15],
    gutterSize: 0.2,
    gutterStyle: function (dimension, gutterSize) {
        return {
            'flex-basis': gutterSize + 'em',
        };
    },
});
