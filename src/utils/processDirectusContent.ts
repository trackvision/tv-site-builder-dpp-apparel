import api from "@/api";
import { logger } from "@/constants";

/**
 * Processes Directus HTML content to convert authenticated image URLs to base64
 * @param content - The HTML content from Directus with potential image tags
 * @param apiBaseUrl - The base URL of the API (defaults to the configured API URL)
 * @returns Promise resolving to processed HTML content with base64 images
 */
export async function processDirectusContent(
  content: string, 
  apiBaseUrl: string = "https://atgadev.trackvision.ai"
): Promise<string> {
  if (!content) {
    return content;
  }

  try {
    let processedContent = content;
    
    // Find all image URLs in the content - using comprehensive regex
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    const matches = [...processedContent.matchAll(imgRegex)];
    
    for (const match of matches) {
      const originalSrc = match[1];
      
      // Skip if already base64
      if (originalSrc.startsWith('data:')) {
        continue;
      }
      
      try {
        let assetPath: string;
        
        // Handle different URL formats
        if (originalSrc.startsWith(`${apiBaseUrl}/assets/`)) {
          // Full URL from same domain - extract the asset path
          assetPath = originalSrc.replace(apiBaseUrl, '');
          // Remove query parameters
          const pathParts = assetPath.split('?');
          assetPath = pathParts[0];
        } else if (originalSrc.includes('/assets/')) {
          // Contains /assets/ somewhere in the URL - extract the asset part
          const assetMatch = originalSrc.match(/\/assets\/([^?\s]+)/);
          if (assetMatch) {
            assetPath = `/assets/${assetMatch[1]}`;
          } else {
            logger.info('Could not parse asset path from:', originalSrc);
            continue;
          }
        } else if (originalSrc.startsWith('/assets/')) {
          // Relative URL starting with /assets/
          assetPath = originalSrc.split('?')[0]; // Remove query parameters
        } else if (!originalSrc.startsWith('http')) {
          // Relative path, assume it's an asset ID
          assetPath = `/assets/${originalSrc}`;
        } else {
          // External URL from different domain - skip
          logger.info('Skipping external URL:', originalSrc);
          continue;
        }
        
        // Convert to base64 using authenticated API
        const base64Data = await api.getBase64(assetPath);
        processedContent = processedContent.replace(originalSrc, base64Data);

      } catch (error) {
        logger.warn(`Failed to convert image ${originalSrc} to base64:`, error);
        // Continue processing other images even if one fails
      }
    }

    return processedContent;
  } catch (error) {
    logger.error('Error processing Directus content:', error);
    // Return original content if processing fails
    return content;
  }
}

/**
 * Type guard to check if content exists and is a string
 */
export function hasContent(content: string | null | undefined): content is string {
  return typeof content === 'string' && content.length > 0;
}