package de.neuefische.backend.service;


import de.neuefische.backend.dto.ChatGptRequest;
import de.neuefische.backend.dto.ChatGptResponse;
import de.neuefische.backend.dto.PromptRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class ChatGptService {
    private final RestClient restClient;
    private final BasicErrorController basicErrorController;


    public ChatGptService(RestClient restClient, BasicErrorController basicErrorController) {
        this.restClient = restClient;
        this.basicErrorController = basicErrorController;
    }

    @Value("${openapi.api.key}")
    private String apikey;

    @Value("${openapi.api.model}")
    private String model;

    public String getChatResponse(PromptRequest promptRequest){

        ChatGptRequest chatGptRequest = new ChatGptRequest(
                model,
                List.of(new ChatGptRequest.Message("user",promptRequest.prompt()))
        );

        ChatGptResponse response = restClient.post()
                .header("Authorization", "Bearer " + apikey)
                .header("Content-Type", "application/json")
                .body(chatGptRequest)
                .retrieve()
                .body(ChatGptResponse.class);
        return response.choices().get(0).message().content();
    }
}
