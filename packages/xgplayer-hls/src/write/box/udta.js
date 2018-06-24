import Box from '../box';
Box.udta = function (data, output) {
    output.write(new Uint8Array(new Uint8Array(data.data)));
    delete this.data;
};
