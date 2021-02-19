import React from 'react';
import ImageUploader from 'react-images-upload';

class ImageUpload extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
   
    render() {
        return (
            <div className='ImageUploader' style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{width:'500px', heigh:'auto'}}>
                    <ImageUploader
                        withIcon={true}
                        withPreview={true}
                        buttonText='Choose images to Upload'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}                      
                        />
                </div>
            </div>
        );
    }
}


export default ImageUpload;