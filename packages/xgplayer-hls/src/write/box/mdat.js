import Box from '../box';
Box.mdat = function (data, output) {
    output.write(new Uint8Array(new Uint8Array(data.data)));
    delete this.data;
};
