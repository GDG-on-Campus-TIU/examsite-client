<script lang="ts" setup>
import { ref } from "vue";

export type QuestionType = {
  question: string;
  choices: Array<{ index: number; choice: string }>;
  rightChoice: { index: number; choice: string };
  examId: string;
  _id: string;
};

// Fetching the questions data
const { questions } = await $fetch<{ questions: QuestionType[] }>(
  "http://localhost:8998/api/v1/questions/get-all/6755cc46cf6a991bf8204af9?a_email=aritra@gdgoctiu.com&a_pass=RJiQ$jwzeOQrR$z9"
);

// Array to store selected choices for each question
const selectedChoices = ref<{ questionId: string; choiceIndex: number }[]>([]);

// Function to handle the change when a radio button is clicked
const handleChoiceChange = (questionId: string, choiceIndex: number) => {
  // Check if the question already has a selection
  const existingChoice = selectedChoices.value.find(
    (item) => item.questionId === questionId
  );

  if (existingChoice) {
    // Update the existing choice
    existingChoice.choiceIndex = choiceIndex;
  } else {
    // Add a new choice
    selectedChoices.value.push({
      questionId: questionId,
      choiceIndex: choiceIndex,
    });
  }
};
</script>

<template>
  <Form>
    <div v-for="(question, index) in questions" :key="question.examId">
      <FormItem>
        <Card class="mb-4">
          <CardHeader>
            <CardTitle class="text-2xl">{{ question.question }}</CardTitle>
          </CardHeader>
          <CardContent>
            <!-- RadioGroup for choices of each question -->
            <RadioGroup :name="`question-${index}`">
              <div
                v-for="choice in question.choices"
                :key="choice.index"
                class="flex items-center space-x-2"
              >
                <RadioGroupItem
                  :id="choice.index.toString()"
                  :value="choice.index.toString()"
                  @click="handleChoiceChange(question._id, choice.index)"
                />
                <Label :for="choice.index.toString()">{{
                  choice.choice
                }}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </FormItem>
    </div>

    <!-- Submit Button -->
    <Button> Submit Answers </Button>
  </Form>
</template>
