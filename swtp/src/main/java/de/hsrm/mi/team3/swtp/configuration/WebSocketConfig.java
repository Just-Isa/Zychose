package de.hsrm.mi.team3.swtp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/*
 * Konfiguration der Websocket.
 * Implementiert den WebSocketMessageBrokerConfigurer.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  /**
   * Methode setzt Adresse für alle Destinations.
   * 
   * @param registry
   */
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // Prefix für alle zugehörigen Destinations,
    // z.B. /topic/news, /topic/offers usw.
    registry.enableSimpleBroker("/topic");
    // registry.setApplicationDestinationPrefixes("/app");

  }

  /**
   * Methode setzt den Endpunkt für Stomp.
   * 
   * @param registry
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/stompbroker")
        .setAllowedOrigins("*");
  }
}
