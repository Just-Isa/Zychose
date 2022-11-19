package de.hsrm.mi.team3.swtp.services;

import org.springframework.stereotype.Service;

import de.hsrm.mi.team3.swtp.domain.Room;
import de.hsrm.mi.team3.swtp.domain.User;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendMouseMessage;
import de.hsrm.mi.team3.swtp.domain.messaging.BackendOperation;

@Service
public interface BackendInfoService {
    public void sendRoom(String topicname, BackendOperation operation, Room room);

    public void sendUser(String topicname, BackendOperation operation, User user);

    public void sendMouse(String topicname, BackendMouseMessage mouse);
}

