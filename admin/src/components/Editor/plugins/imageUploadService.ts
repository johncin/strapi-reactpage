import { ImageUploadType } from '@react-page/editor';

// receive file from react-page, do upload work, resolve with { url: string }
const fakeImageUploadService: () => ImageUploadType =
  () => (file, reportProgress) => {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        reportProgress(counter * 10);
        if (counter > 9) {
          clearInterval(interval);
          alert(
            'Image has not actually been uploaded to a server. Check documentation for information on how to provide your own upload function.'
          );
          resolve({ url: URL.createObjectURL(file) });
        }
      }, 100);
    });
  };

export default fakeImageUploadService;
