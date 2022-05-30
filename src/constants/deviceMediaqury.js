const sizes = {
    xxl: 1440,
    xl: 996,
    md: 768,
    sm: 576,
};

const prefix = "@media screen and (min-width: {size}px)";

const br = Object.entries(sizes).reduce((p, n) => {
    const [device, size] = n;
    p[device] = prefix.replace("{size}", size);
    return p;
}, {});

export default br;
