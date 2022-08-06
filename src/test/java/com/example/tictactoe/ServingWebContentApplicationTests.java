package com.example.tictactoe;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Random;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ServingWebContentApplicationTests {

	@LocalServerPort
	private String port;

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	@DisplayName("Render Index Page")
	void RenderIndexPage() throws Exception {

		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/",
		String.class)).contains("Tic Tac Toe");
			
	}

	@Test
	@DisplayName("Render Play Page")
	void RenderPlayPage() throws Exception {

		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/play",
		String.class)).contains("Wins", "Draws", "Loses");

	}

	@Test
	@DisplayName("Render Instructions Page")
	void RenderInstructionsPage() throws Exception {

		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/instructions",
		String.class)).contains("You vs Computer");
	}

	@Test
	@DisplayName("Computer's Turn Algorithm")
	void ComputerAlgorithm() throws Exception {

		Boolean DecisionMade = false;
		String ArrayOfPlacements[][] = new String[3][3];
		Random Rand = new Random();

		ArrayOfPlacements[0][0] = "";
		ArrayOfPlacements[0][1] = "x";
		ArrayOfPlacements[0][2] = "";
		ArrayOfPlacements[1][0] = "";
		ArrayOfPlacements[1][1] = "";
		ArrayOfPlacements[1][2] = "x";
		ArrayOfPlacements[2][0] = "";
		ArrayOfPlacements[2][1] = "o";
		ArrayOfPlacements[2][2] = "";

		// Try and place an X in an available square.
		// Keep looping, until a decision has been made.
		while (!DecisionMade) {

			int RandomPlacementOne = Rand.nextInt(3);
			int RandomPlacementTwo = Rand.nextInt(3);
			String CurrentPlacement = ArrayOfPlacements[RandomPlacementOne][RandomPlacementTwo];
			
			if (CurrentPlacement == "") {
				DecisionMade = true;
			}
		}
	}
}
