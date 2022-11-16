package de.hsrm.mi.team3.swtp.services;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;

@Service
public interface BackendInfoService {
    public void sendInfo(String topicname, BackendOperation operation, long id); 
    public void sendRoom(String topicname, BackendOperation operation, Room room);
}

