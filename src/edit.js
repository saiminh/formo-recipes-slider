import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';
import previewImage from './assets/previewimage.jpg';
import {useState} from '@wordpress/element';

export default function Edit({attributes, setAttributes}) {

  // const [delay, setDelay] = useState(attributes.delay || 5);

  const handleDelayChange = (newDelay) => {
    const numericDelay = Number(newDelay);
    // setDelay(numericDelay);
    setAttributes({ delay: numericDelay });
  };

  return (
    <div { ...useBlockProps() }>
      <img className='formo-recipe-slider-previewImage' src={ previewImage } alt="" />
      <div className='formo-recipe-slider-previewText'>
        <div className='formo-recipe-slider-previewText-inner'>
          <h3 className='formo-recipe-slider-previewText-header'>
          { __(
              'This is the formo recipe slider block',
              'formo-recipes-slider'
            ) }
          </h3>
          <p className='formo-recipe-slider-previewText-p'>
            { __(
              'It pulls in recipes from the formo recipe post type and displays four of them randomly in a slider. You can only change the time it takes for the slider to change slides in the block settings on the right.',
              'formo-recipes-slider'
            ) }
          </p>
          <p className='formo-recipe-slider-previewText-p'>
            At the moment the delay is set to { attributes.delay } seconds.
          </p>
        </div>
      </div>
      <InspectorControls>
        <PanelBody title={__('Recipe Slider Settings')}>
          <p>{__('How long will each slide  be visible? ')}</p>
          <TextControl
            type='number'
            label={__('Duration (in seconds)')}
            min={1}
            max={100}
            value={attributes.delay}
            onChange={(value) => {
              handleDelayChange(value);
            }}
          />
        </PanelBody>
      </InspectorControls>
    </div>
  );
}
