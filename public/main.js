const init = async () => {

    let rustApp = null;

    try {
        rustApp = await import('../pkg');
    } catch (error) {
        console.log(error);
        return;
    }

    console.log('rustApp:', rustApp);

    /** @type {HTMLInputElement} */
    const input = document.getElementById('upload');

    const fileReader = new FileReader();
    
    fileReader.onloadend = (e) => {
        /* remove the browser's meta data from the beginning of the
            base64 string */
        const base64 = fileReader.result.replace(
            /^data:image\/(png|jpeg|jpg);base64,/, ''
        );

        // console.log('input.files[0]:', input.files[0]);
        // console.log('base64:', base64);

        /* get a grayscale version of our image from our rust code */
        const imgDataURL = rustApp.grayscale(base64);

        /* display the grayscale image to the user */
        document.getElementById('new-img').setAttribute(
            'src', imgDataURL
        );
    };

    /* change event will be fired whenever the user uploads a
        file on an input element */
    input.addEventListener('change', () => {
        fileReader.readAsDataURL(input.files[0]);
    });
};

init();