<?php
/**
 * Plugin Name:       Formo Recipes Slider
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       formo-recipes-slider
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function render_four_random_recipes( $block_attributes, $content) {
  $result;
  if ( empty( $block_attributes['delay'] ) ) {
    $block_attributes['delay'] = '5';
  }
  
  $args = array(  
    'post_type' => 'post',
    'category_name' => 'recipes',
    'post_status' => 'publish',
    'posts_per_page' => 4, 
    'orderby' => 'rand'
  );
    
    $loop = new WP_Query( $args ); 
    
    $result = '<div class="formo-recipe-slider" data-delay="'.$block_attributes['delay'].'">';

    if ( !$loop->have_posts() ) {
      $result = $result.'<li class="no-recipes">There are no recipes at the moment.</li>';
    } 
    else {
        
      while ( $loop->have_posts() ) { 
        $loop->the_post();
        $title = get_the_title();
        $featured_image = get_the_post_thumbnail();
        
        $result = $result.
          '<div class="formo-recipe-slide">
            <a href="'.get_the_permalink().'">
              <div class="formo-recipe-slide-image">'.$featured_image.'</div>
              <div class="formo-recipe-slide-content">
                <h3>'.$title.'</h3>
              </div>
            </a>
          </div>';
      }
      wp_reset_postdata(); 
    }
  $result = $result.'<div class="recipe-slider-sliderNav"></div>';
  $result = $result.'</div>';
  return $result;
}

function create_block_formo_recipes_slider_block_init() {
  register_block_type( __DIR__ . '/build', array(
    'attributes'        => array(
      'api_version'       => 2,
      'delay'   => array( 
        'type' => 'number',
        'default' => 5
      ),
    ),
    'render_callback' => 'render_four_random_recipes',
  ) );
}
add_action( 'init', 'create_block_formo_recipes_slider_block_init' );