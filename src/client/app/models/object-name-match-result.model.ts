/**
 * Form of individual entry returned from CATCH api at the object-name search route
 * `/query/name?name`
 */
export interface IObjectNameMatchResult {
  // body_type <=> 'EBodyType' in API code
  body_type: 'asteroid' | 'comet' | 'interstellar_object' | 'unknown';
  comparison_text: string;
  display_text: string;
  target: string;
}
