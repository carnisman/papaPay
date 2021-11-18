export default {
  container: {
    margin: "3rem auto",
  },
  input_card: {
    width: "100%",
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "2rem",
  },
  fab: {
    position: "fixed",
    right: "2rem",
    bottom: "2rem",
    zIndex: "4",
  },
  two_inputs_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  text_input: {
    margin: "0 0 2rem 0",
  },
  select_right: {
    width: "6rem",
    marginRight: "1rem",
    padding: "0",
  },
  activitie_card: {
    margin: "1rem 1rem 2rem 1rem",
  },
  activities_card: {
    width: "100%",
    margin: "2rem auto",
  },
  activitie_list_item: {
    width: "100% ",
    padding: "1rem",
    // margin: "0.5rem",
  },
  activities_grid: {
    padding: "0 2rem",
  },
  activities_grid_item: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
  },
  see_more_btn: {
    display: "flex",
    padding: "0.5rem 1rem",
    justifyContent: "space-between",
  },
  delete_icon: { color: "#a81100" },
  patient_info_double: {
    display: "flex",
    gap: "1rem",
  },
  tag: {
    margin: "0.5rem",
  },
  tags_container: { 
    display: "flex", 
    flexDirection: "row", 
    flexWrap: "wrap" 
  },
  online_badge: {
    position: "absolute",
    top: "1.5rem",
    left: "3rem",
    borderRadius: "50%",
    background: "#81c784",
    width: "0.5rem",
    height: "0.5rem",
  },

  // MODAL
  loading_modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "400px",
  },
  dialog_title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activities_table: {
    overflowY: "scroll",
    width: "100%",
    maxHeight: "250px",
    margin: "1rem 0",
  },
  container_menu_item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filter_text: {
    marginRight: "2rem",
  },
  menu_item_text: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  menu_item_radio: {
    height: "1rem",
  },

  // RESULTS 
  results_card: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    width: "80%",
    margin: "2rem auto 1rem auto"
  },
  result_question: {
    maxWidth: "65%",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    marginBottom: "1rem",
  },
  result_answer: {
    maxWidth: "65%",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    justifySelf: "flex-end"
  },

// UTILS
  flex_center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  max_width_45: {
    maxWidth: "45%",
  }
}