package com.example.tictactoe;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

	@GetMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/play")
	public String play() {
		return "play";
	}

	@GetMapping("/instructions")
	public String instructions() {
		return "instructions";
	}

	// When there is an application error, go to the error page.
	@GetMapping("/error")
	public String error() {
		return "error";
	}
}