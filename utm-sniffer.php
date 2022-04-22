<?php
/**
 * Plugin Name: UTM Sniffer
 * Description: This plugin adds UTM tracking code to your forms based on JavaScript. contact form 7
 * Version: 1.0.0
 * Author: Halil Şafak KILIÇ
 * Author URI: https://halilsafakkilic.com
 */

// If this file is called directly
if (!class_exists('WP') && $_SERVER['SCRIPT_FILENAME'] == __FILE__) {
    die('Access denied.');
}

// Add JS
function _utm_sniffer_script()
{
    wp_enqueue_script('utm_sniffer', plugin_dir_url(__FILE__) . 'js/utm-sniffer.js', [], '1.0.0', true);
}

add_action('wp_enqueue_scripts', '_utm_sniffer_script');