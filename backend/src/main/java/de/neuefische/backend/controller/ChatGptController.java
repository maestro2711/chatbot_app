package de.neuefische.backend.controller;


import de.neuefische.backend.dto.PromptRequest;
import de.neuefische.backend.service.ChatGptService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatGptController {
    private final ChatGptService chatGptService;

    public ChatGptController(ChatGptService chatGptService) {
        this.chatGptService = chatGptService;
    }

    @PostMapping
    public String chat(@RequestBody PromptRequest promptRequest) {
        return chatGptService.getChatResponse(promptRequest);
    }
}
