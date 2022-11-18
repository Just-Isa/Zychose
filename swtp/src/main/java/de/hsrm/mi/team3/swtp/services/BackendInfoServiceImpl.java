package de.hsrm.mi.team3.swtp.services;
 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendRoomMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendUserMessage;

@Service
public class BackendInfoServiceImpl implements BackendInfoService{

    @Autowired SimpMessagingTemplate messaging;

    @Override
    public void sendRoom(String topicname,BackendOperation operation, Room room){
        messaging.convertAndSend("/topic/"+topicname, new BackendRoomMessage(operation, room));
    }


    @Override
    public void sendUser(String topicname, BackendOperation operation, User user) {
        messaging.convertAndSend("/topic/"+topicname, new BackendUserMessage(operation, user));        
    }
}
