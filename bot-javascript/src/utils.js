const formatarData = (padrao, data) => {
    var componentes = 'YYYY:MM:DD:HH:mm:ss'.split(':')
    data = new Date(data || Date.now() - new Date().getTimezoneOffset() * 6e4)

    return data.toISOString().split(/[-:.TZ]/)
        .reduce((template, item, i) => template.split(componentes[i]).join(item), padrao)
};

const gerarNumeroRandom = (min, max) => {
    return min + Math.floor((max - min) * Math.random());
};

const cores = [
    '#3399ff',
    '#ff4da6',
    '#ff5c33',
    '#009933',
    '#ffffff',
    '#ff8989',
    '#66ffc6',
    '#ffdc51',
    '#000000'
];

module.exports = {
    formatarData: formatarData,
    gerarNumeroRandom: gerarNumeroRandom,
    cores: cores
}