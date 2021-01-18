import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RecipeTree from "@/components/RecipeTree";
import RecipeTreeItem from "@/components/RecipeTreeItem";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("RecipeTree component", () => {
  let actions, getters, wp;

  beforeEach(() => {
    getters = {
      rootRecipeId: () => "root"
    };
    actions = {
      fetchRecipes: jest.fn()
    };
    const store = new Vuex.Store({
      actions,
      getters
    });

    wp = shallowMount(RecipeTree, { store, localVue });
  });

  it("should render as expected", () => {
    expect(wp).toMatchSnapshot();
  });

  it('dispatches "fetchRecipes" on mount', () => {
    expect(actions.fetchRecipes).toHaveBeenCalled();
  });

  it("should pass right recipeId to the TreeItem", () => {
    expect(wp.findComponent(RecipeTreeItem).props("recipeId")).toBe(
      getters.rootRecipeId()
    );
  });
});
