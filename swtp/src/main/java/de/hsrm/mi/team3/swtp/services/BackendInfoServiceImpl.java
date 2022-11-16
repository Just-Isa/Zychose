package de.hsrm.mi.team3.swtp.services;
 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendInfoMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;

@Service
public class BackendInfoServiceImpl implements BackendInfoService{

    @Autowired SimpMessagingTemplate messaging;

    @Override
    public void sendInfo(String topicname, BackendOperation operation, long id) {
        messaging.convertAndSend("/topic/"+topicname, new BackendInfoMessage(topicname,operation,id));
    }

    public void sendRoom(String topicname,BackendOperation operation, Room room){
        messaging.convertAndSend("/topic/"+topicname, room);
    }
}
