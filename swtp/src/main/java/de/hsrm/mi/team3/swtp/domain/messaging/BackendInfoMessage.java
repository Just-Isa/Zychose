package de.hsrm.mi.team3.swtp.domain.messaging;

public record BackendInfoMessage(String topicname, BackendOperation operation, long id){}

