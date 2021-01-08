import { provide } from 'midway';
import { Stream } from 'stream';

const images = require('images');

@provide('resizeImage')
export default class ResizeImage {
    resize(path: string, size: number): Stream {
        return images(path).size(size).encode('jpg');
    }
}
